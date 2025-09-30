

export const fetchRegionsDepartments = async (): Promise<string[]> => {
  let result: string[] = [];
  let response = await fetch('https://geo.api.gouv.fr/regions');
  let json = await response.json();

  result = result.concat(json.map((region: any) =>region.nom))

  response = await fetch('https://geo.api.gouv.fr/departements');
  json = await response.json();
  result = result.concat(json.map((departement: any) =>departement.nom))

  return result;
};
