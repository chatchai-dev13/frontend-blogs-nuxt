import { logout } from '@/services/adminService'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

export function useAdmin() {
    const router = useRouter()
    
    const fnLogout = async () => {
        const res = await logout();

        if (res) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logout สำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });

            router.push('/login')
        }
    }

    return {
        fnLogout
    }
}