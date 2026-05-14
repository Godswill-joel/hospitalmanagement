import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-4xl font-bold mb-4">Welcome to the Hospital Management System</h1>
            <p className="text-lg text-gray-700">Manage your hospital efficiently with our comprehensive system.</p>
        </div>
    )
}