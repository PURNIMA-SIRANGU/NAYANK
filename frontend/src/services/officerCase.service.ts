export async function getAllCases() {
  const response = await fetch(
    "http://localhost:3001/cases"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cases");
  }

  return response.json();
}
