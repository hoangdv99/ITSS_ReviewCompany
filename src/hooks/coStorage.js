import {useState, useEffect} from 'react';
import {getCompanies} from '../config/firebase';

function useCoStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [items]);

    const getItems = async () => {
        const _items = await getCompanies();
        setItems(_items);
    }

    return [items];
}

export default useCoStorage;