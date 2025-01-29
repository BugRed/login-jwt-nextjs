import { getCookie } from "cookies-next"
import { verifyToken } from "../services/user"
import { redirect } from "next/dist/server/api-utils"

export default function Home() {
  return (
    <div>
      página segura - perfil de user
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', {req, res})
    if (!token) throw new Error('Token Inválido')
    
    verifyToken(token)

    return {
      props: {}
    }
  } catch (error) {
    
    return {
      redirect: {
        permanet: false,
        destination: '/login',
      },
      props: {}
    }
  }
}