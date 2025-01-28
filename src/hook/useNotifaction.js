import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (msg, type) => {
    if (type === "success") {
        toast.success(msg);
    } else if (type === "warning") {
        toast.warning(msg);
    } else if (type === "error") {
        toast.error(msg);
    }
};