import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientStore } from "../../store/client.store";

export const ClientEntry = () => {
  const { businessType, businessId } = useParams();
  const setBusinessContext = useClientStore((s) => s.setBusinessContext);

  useEffect(() => {
    if (businessId) {
      setBusinessContext({
        businessType: (businessType as any) ?? null,
        businessId,
      });
    }
  }, [businessType, businessId, setBusinessContext]);

  return null;
};
