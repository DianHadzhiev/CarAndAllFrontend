export default function Register({
  formData,
  activeTab,
  setActiveTab,
  setFormData,
  handleSubmit,
  error,
  success
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <div className="w-full max-w-md bg-white rounded shadow-md">
        <div className="flex border-b">
          <button
            onClick={() => {
              setActiveTab("personal");
              setFormData({
                voorNaam: "",
                achterNaam: "",
                email: "",
                password: "",
                telefoonNummer: "",
                straatHuisnummer: "",
                postcode: "",
              });
            }}
            className={`flex-1 p-4 text-center ${
              activeTab === "personal"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            type="button"
          >
            Personal
          </button>
          <button
            onClick={() => {
              setActiveTab("business");
              setFormData({
                voorNaam: "",
                achterNaam: "",
                email: "",
                password: "",
                bedrijfnaam: "",
                kvk: "",
                bedrijfTelefoonNummer: "",
                bedrijfStraatHuisnummer: "",
                bedrijfPostcode: "",
              });
            }}
            className={`flex-1 p-4 text-center ${
              activeTab === "business"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            type="button"
          >
            Business
          </button>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          {activeTab === "personal" ? (
            <>
              <input
                type="text"
                placeholder="Voornaam"
                value={formData.voorNaam}
                onChange={(e) =>
                  setFormData({ ...formData, voorNaam: e.target.value })
                }
                className="w-full mb-4 px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Achternaam"
                value={formData.achterNaam}
                onChange={(e) =>
                  setFormData({ ...formData, achterNaam: e.target.value })
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
              <input
                type="tel"
                placeholder="Telefoon"
                value={formData.telefoonNummer}
                onChange={(e) =>
                  setFormData({ ...formData, telefoonNummer: e.target.value })
                }
                className="w-full mb-4 px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Straat en huisnummer"
                value={formData.straatHuisnummer}
                onChange={(e) =>
                  setFormData({ ...formData, straatHuisnummer: e.target.value })
                }
                className="w-full mb-4 px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Postcode"
                value={formData.postcode}
                onChange={(e) =>
                  setFormData({ ...formData, postcode: e.target.value })
                }
                className="w-full mb-4 px-4 py-2 border rounded"
                required
              />
            </>
          ) : (
            <>
            <input
              type="text"
              placeholder="Company Name"
              value={formData.bedrijfnaam}
              onChange={(e) =>
                setFormData({ ...formData, bedrijfnaam: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="KVK Number"
              value={formData.kvk}
              onChange={(e) =>
                setFormData({ ...formData, kvk: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Company Phone"
              value={formData.bedrijfTelefoonNummer}
              onChange={(e) =>
                setFormData({ ...formData, bedrijfTelefoonNummer: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Company Address"
              value={formData.bedrijfStraatHuisnummer}
              onChange={(e) =>
                setFormData({ ...formData, bedrijfStraatHuisnummer: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Company Postcode"
              value={formData.bedrijfPostcode}
              onChange={(e) =>
                setFormData({ ...formData, bedrijfPostcode: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            {/* User fields */}
            <input
              type="text"
              placeholder="First Name"
              value={formData.voorNaam}
              onChange={(e) =>
                setFormData({ ...formData, voorNaam: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.achterNaam}
              onChange={(e) =>
                setFormData({ ...formData, achterNaam: e.target.value })
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
          {success && (
            <p className="text-green-500 mt-4">Registration Successful!</p>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}