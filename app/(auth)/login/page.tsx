import { Metadata } from "next"
import LoginPage from "../components/pages/login-page"

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "تسجيل الدخول إلى حسابك",
}

export default function Login() {
  return (
    <LoginPage />
  )
}
