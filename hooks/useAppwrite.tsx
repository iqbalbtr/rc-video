import { useEffect, useState } from 'react'

function useAppwrite<T>(fn: () => Promise<T>) {
  
    const [data, setData] = useState<T | null>();
    const [err, setErr] = useState("");
    const [isLoading, setLoading] = useState(false);

    const refersh = async() => {
        setLoading(true)
        setData(null);
        try {
            const result = await fn();
            setData(result);
        } catch (error: any) {
            setErr(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refersh()
    }, [])

    return {
        isLoading,
        data,
        err,
        refersh,
        handleData: setData
    }
}

export default useAppwrite