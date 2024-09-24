
// ===========================================user related apis===============================================
export const createUserViaEmailPasswordUrl = `${import.meta.env.VITE_REACT_APP_URL
}/v1/user/register`;


export const loginUserViaEmailPasswordUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/login`;


export const registerUserViaGoogleUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/social/create`;


export const loginUserViaGoogleUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/social/login`;


export const getUserInfoUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/get/user`;


export const logoutUserUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/logout`;


export const refreshTokenUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/user/refresh-token`;


// ===========================================user related apis===============================================


// ========================================task related apis===================================================
export const createTaskUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/task/add`;

export const updateTaskUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/task/update`;

export const deleteTaskUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/task/delete`;

export const changeTaskStatusUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/task/status/update`;
// ========================================task related apis===================================================


// ========================================column related apis===================================================
export const getAllColumnsAndTasksUrl = `${import.meta.env.VITE_REACT_APP_URL}/v1/column/getAll`;


export const googleLoginUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token`;