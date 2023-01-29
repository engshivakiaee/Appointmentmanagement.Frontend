
export function handleResponse<T>(response: {
  data: T;
  status: number;
  text?: () => string;
}): T {
  if (response.status === 200) return response.data;
  if (response.status === 400 && response.text) {
    const error = response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

export const handleError = (error) => {
  if (!error.response) {
    // eslint-disable-next-line no-alert
    alert(`error: ${error}`);
  } else if (error.response.status === 401) {
      localStorage.removeItem('user_token');
    // eslint-disable-next-line no-alert
    alert('Unauthorized');
  } else {

  }
  throw error;
};
