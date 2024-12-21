
export default function Register({formData, activeTab, setActiveTab, setFormData, handleSubmit, error, success}){
    return(<div className="flex flex-col items-center justify-center h-screen bg-blue-500">
        <div className="w-full max-w-md bg-white rounded shadow-md">
            <div className="flex border-b">
                <button
                    onClick={() => {
                        setActiveTab("personal");
                        setFormData({ name: "", email: "", password: "", phone: "" });
                    }}
                    className={`flex-1 p-4 text-center ${
                        activeTab === "personal"
                            ? "bg-blue-700 text-white"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    Personal
                </button>
                <button
                    onClick={() => {
                        setActiveTab("business");
                        setFormData({ companyName: "", kvkNumber: "", email: "", password: "" });
                    }}
                    className={`flex-1 p-4 text-center ${
                        activeTab === "business"
                            ? "bg-blue-700 text-white"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    Business
                </button>
            </div>
            <form className="p-6" onSubmit={handleSubmit}>
                {activeTab === "personal" ? (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                            }
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="KVK Number"
                            value={formData.kvkNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, kvkNumber: e.target.value })
                            }
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full mb-4 px-4 py-2 border rounded"
                            required
                        />
                    </>
                )}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Register
                </button>
                {success && <p className="text-green-500 mt-4">Registration Successful!</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    </div>
    );
}