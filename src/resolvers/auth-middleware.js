import getUserId from '../utils/get-user-id';

const authMiddleware = async(resolve, parent, args, context, info) => {
  const user = getUserId(context.request);
  context.request.user = { ...user };
  const result = await resolve(parent, args, context, info);
  return result;
};

export default authMiddleware;