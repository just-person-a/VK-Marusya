export const checkRequest = (request: Response, message: string) => {
  if (!request.ok) {
    throw new Error(message);
  };
};
