// utils/businessRedirect.ts
export const businessRedirect = (type: string) => {
  switch (type) {
    case "queue":
      return "/dashboard/queue";
    case "retail":
      return "/dashboard/orders";
    case "both":
      return "/dashboard";
    default:
      return "/onboarding";
  }
};
