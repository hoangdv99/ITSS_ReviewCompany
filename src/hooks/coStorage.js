import {useState, useEffect} from 'react';
import {addCompany, getCompanies, removeCompany, updateCompany} from '../config/firebase';

function useCoStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const _items = await getCompanies();
        setItems(_items);
    }

    const addItem = async (item) => {
        await addCompany(item);
        setItems([...items, item]);
    }

    const updateItem = async (item) => {
        await updateCompany(item);
        const _items = await getCompanies();
        setItems(_items);
    }

    const removeItem = async (item) => {
       await removeCompany(item);
       const _items = items.filter((x) => x.id !== item.id);
       setItems(_items);
    }

    return [items, addItem, updateItem, removeItem];
}

export default useCoStorage;