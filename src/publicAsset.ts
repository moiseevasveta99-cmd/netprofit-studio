/** Resolve public assets for GitHub project URLs and custom-domain root URLs. */
export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
