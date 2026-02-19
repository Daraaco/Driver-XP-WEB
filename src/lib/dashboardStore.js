import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const COMPANIES_KEY = "companies";

function getLocalCompanies() {
  try {
    const raw = localStorage.getItem(COMPANIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalCompanies(companies) {
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
}

function normalizeCompany(company) {
  return {
    ...company,
    pdfs: company.pdfs || [],
  };
}

function toCompanyWithPdfs(companies, docs) {
  const docsByCompany = docs.reduce((acc, doc) => {
    if (!acc[doc.company_id]) acc[doc.company_id] = [];
    acc[doc.company_id].push({
      id: doc.id,
      name: doc.name,
      url: doc.url,
      participants: doc.participants || [],
      uploadedAt: doc.uploaded_at,
    });
    return acc;
  }, {});

  return companies.map((company) => ({
    id: company.id,
    name: company.name,
    username: company.username,
    password: company.password,
    logo: company.logo || null,
    createdAt: company.created_at,
    pdfs: docsByCompany[company.id] || [],
  }));
}

export const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export async function fetchCompanies() {
  if (!isSupabaseConfigured) {
    return getLocalCompanies().map(normalizeCompany);
  }

  const { data: companies, error: companyError } = await supabase
    .from("companies")
    .select("id,name,username,password,logo,created_at")
    .order("created_at", { ascending: false });

  if (companyError) throw companyError;

  if (!companies?.length) return [];

  const companyIds = companies.map((c) => c.id);
  const { data: docs, error: docsError } = await supabase
    .from("documents")
    .select("id,company_id,name,url,participants,uploaded_at")
    .in("company_id", companyIds)
    .order("uploaded_at", { ascending: false });

  if (docsError) throw docsError;

  return toCompanyWithPdfs(companies, docs || []);
}

export async function createCompany(companyData) {
  if (!isSupabaseConfigured) {
    const company = {
      ...companyData,
      id: Date.now().toString(),
      pdfs: [],
      createdAt: new Date().toISOString(),
    };
    const companies = getLocalCompanies();
    setLocalCompanies([company, ...companies]);
    return company;
  }

  const payload = {
    name: companyData.name,
    username: companyData.username,
    password: companyData.password,
    logo: companyData.logo || null,
  };

  const { data, error } = await supabase
    .from("companies")
    .insert(payload)
    .select("id,name,username,password,logo,created_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    username: data.username,
    password: data.password,
    logo: data.logo,
    createdAt: data.created_at,
    pdfs: [],
  };
}

export async function updateCompany(companyId, companyData) {
  if (!isSupabaseConfigured) {
    const companies = getLocalCompanies();
    const nextCompanies = companies.map((company) =>
      company.id === companyId ? { ...company, ...companyData } : company
    );
    setLocalCompanies(nextCompanies);
    return nextCompanies.find((c) => c.id === companyId);
  }

  const { data, error } = await supabase
    .from("companies")
    .update({
      name: companyData.name,
      username: companyData.username,
      password: companyData.password,
      logo: companyData.logo || null,
    })
    .eq("id", companyId)
    .select("id,name,username,password,logo,created_at")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCompany(companyId) {
  if (!isSupabaseConfigured) {
    const companies = getLocalCompanies().filter((company) => company.id !== companyId);
    setLocalCompanies(companies);
    return;
  }

  const { error: docsError } = await supabase
    .from("documents")
    .delete()
    .eq("company_id", companyId);
  if (docsError) throw docsError;

  const { error } = await supabase.from("companies").delete().eq("id", companyId);
  if (error) throw error;
}

async function uploadFileToSupabase(companyId, file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${companyId}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("company-pdfs").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("company-pdfs").getPublicUrl(path);
  return data.publicUrl;
}

export async function createDocument(companyId, pdfData) {
  if (!isSupabaseConfigured) {
    const companies = getLocalCompanies();
    const nextCompanies = companies.map((company) =>
      company.id === companyId
        ? {
            ...company,
            pdfs: [
              ...(company.pdfs || []),
              {
                id: Date.now().toString(),
                name: pdfData.name,
                url: pdfData.url,
                participants: pdfData.participants || [],
                uploadedAt: new Date().toISOString(),
              },
            ],
          }
        : company
    );
    setLocalCompanies(nextCompanies);
    return;
  }

  const url = pdfData.file ? await uploadFileToSupabase(companyId, pdfData.file) : pdfData.url;
  const { error } = await supabase.from("documents").insert({
    company_id: companyId,
    name: pdfData.name,
    url,
    participants: pdfData.participants || [],
  });
  if (error) throw error;
}

export async function deleteDocument(companyId, pdfId) {
  if (!isSupabaseConfigured) {
    const companies = getLocalCompanies();
    const nextCompanies = companies.map((company) =>
      company.id === companyId
        ? { ...company, pdfs: (company.pdfs || []).filter((pdf) => pdf.id !== pdfId) }
        : company
    );
    setLocalCompanies(nextCompanies);
    return;
  }

  const { error } = await supabase.from("documents").delete().eq("id", pdfId);
  if (error) throw error;
}

export async function authenticateCompany(username, password) {
  const companies = await fetchCompanies();
  return companies.find((c) => c.username === username && c.password === password) || null;
}
