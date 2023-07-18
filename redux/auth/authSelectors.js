export const selectUserId = (state) => state.auth.userId;

export const selectUserName = (state) => state.auth.login;

export const selectUserPhoto = (state) => state.auth.userAvatar;

export const selectStateChange = (state) => state.auth.stateChange;