import Rest from '../utils/rest';

const baseURL = " https://test.adopets.app/v1/";
const { usePost } = Rest(baseURL)

export const usePetsApi = (data) => {
  const [postData, postPets] = usePost(data)
  return { postData, postPets }
}