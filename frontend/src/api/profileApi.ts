import api from "./api";

export const getProfile = async () => {
  const res = await api.get("/api/profile/me");

  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.patch(
    "/api/profile",

    data,
  );

  return res.data;
};

export const updatePassword = async (data: any) => {
  const res = await api.patch(
    "/api/profile/password",

    {
      oldPassword: data.currentPassword,

      newPassword: data.newPassword,
    },
  );

  return res.data;
};

export const uploadProfileImage = async (file: any) => {
  const formData = new FormData();

  formData.append("image", file);

  const res = await api.patch(
    "/api/profile/image",

    formData,
  );

  return res.data;
};

export const deactivateAccount = async () => {
  const res = await api.patch("/api/profile/deactivate");

  return res.data;
};
// UPDATE EMAIL PREFERENCE

export const updateEmailPreference = async (value: boolean) => {
  const res = await api.patch(
    "/api/user/profile",

    {
      emailNotification: value,
    },
  );

  return res.data;
};
