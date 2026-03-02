export function getUserId() {
  let userId = localStorage.getItem('water_user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('water_user_id', userId);
  }
  return userId;
}
