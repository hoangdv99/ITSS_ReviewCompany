import {useState, useEffect} from 'react';
import {addCompany, getCompanies} from '../config/firebase';

function useCoStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [items]);

    const getItems = async () => {
        const _items = await getCompanies();
        setItems(_items);
    }

    const addItem = async (item) => {
        await addCompany(item);
        setItems([...items, item]);
    }

    return [items, addItem];
}

export default useCoStorage;