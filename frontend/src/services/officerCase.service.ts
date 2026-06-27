export async function getAllCases() {
  const response = await fetch(
    "https://nayank-backend.onrender.com/cases"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cases");
  }

  return response.json();
}
