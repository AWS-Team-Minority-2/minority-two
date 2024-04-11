import { useEffect, useState } from 'react';

const getStoreDataId = async (id) => {
  try {
    const response = await fetch('http://localhost:6002/get/business/via/id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export function BusinessEditable(storeId: string) {
  const [store, setStore] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStoreDataId(storeId);
        setStore(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [storeId]);

  return {
    store: store,
  };
}
