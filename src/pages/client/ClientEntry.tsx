import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientStore } from "../../store/client.store";

export const ClientEntry = () => {
  const { businessId } = useParams();
  const setBusinessContext = useClientStore((s) => s.setBusinessContext);

  useEffect(() => {
    if (businessId) {
      setBusinessContext({
        businessType: null,
        businessId,
      });
    }
  }, [businessId, setBusinessContext]);

  return null;
};
