// utils/roleRedirect.ts
export const roleRedirect = (role: string) => {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "business":
      return "/onboarding";
    case "client":
      return "/home";
    default:
      return "/login";
  }
};
