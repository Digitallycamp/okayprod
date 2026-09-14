import { useGetStorefrontQuery } from "../features/admin/settings/store/storeFrontApi";

const FALLBACK = '#F48031';

export default function useBrandColor() {
  const { data } = useGetStorefrontQuery();
  return data?.data?.primaryBrandColor || FALLBACK;
}