export const getAuthPath = (nickName: string): string =>
  `${process.env.REACT_APP_URL_PATH}/users/search?q=${nickName}`;
