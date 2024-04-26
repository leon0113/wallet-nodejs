export default function NotFound() {
    return (
        <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-4">
            <h1 className=" text-3xl text-white">Page not found</h1>
            <p className="text-white">Return <a href="/" className="text-blue-600">Home</a></p>
        </div>
    )
}
