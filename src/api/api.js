const BASE_URL = "http://localhost:8081";

export const login = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const { accessToken } = await response.json();

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimesheet = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const { timesheetList } = await response.json();
    return timesheetList;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimesheetByChecker = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/checker/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const { timesheetList } = await response.json();
    return timesheetList;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimesheetByAdmin = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const { timesheetList } = await response.json();
    return timesheetList;
  } catch (error) {
    console.log(error);
  }
};

export const createTimesheet = async (token, body) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed create timesheet.");
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const findTimesheetById = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed get timesheet.");
    }
    const { timesheet } = await response.json();
    return timesheet;
  } catch (error) {
    console.log(error);
  }
};

export const proceedTimesheetByChecker = async (token, body, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/checker/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const editTimesheet = async (token, body, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/maker/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTimesheet = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/timesheet/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed delete timesheet.");
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/me/employee`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed get my profile.");
    }
    const { employee } = await response.json();
    return employee;
  } catch (error) {
    console.log(error);
  }
};

export const editEmployee = async (token, body) => {
  try {
    const response = await fetch(`${BASE_URL}/me/employee/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEmployee = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/employee/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }

    const { employee } = await response.json();

    return employee;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeSummaryList = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/employee/all/summary`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed edit timesheet.");
    }

    const { employee } = await response.json();

    return employee;
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk mendapatkan data penyuluh
export const getPenyuluhData = async (authUser, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8081/api/v1/penyuluh?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${authUser}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Jika parameter downloadExcel ada dan bernilai 'Y', kita harapkan response blob
    if (params.downloadExcel === 'Y') {
      const blob = await response.blob();
      return blob;
    } else {
      // Untuk response biasa (JSON)
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching penyuluh data:', error);
    throw error;
  }
};

// Fungsi untuk menghapus data penyuluh
export const deletePenyuluh = async (authUser, penyuluhId) => {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/penyuluh/${penyuluhId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authUser}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Untuk status 204 No Content, kita tidak perlu parsing JSON
    if (response.status === 204) {
      return { code: 200, message: "Data berhasil dihapus" };
    }
    
    // Untuk status lainnya, coba parsing JSON jika ada
    if (response.ok) {
      try {
        const data = await response.json();
        return data;
      } catch (jsonError) {
        return { code: response.status, message: "Data berhasil dihapus" };
      }
    }
    
    // Handle error status
    throw new Error(`HTTP error! status: ${response.status}`);
    
  } catch (error) {
    console.error('Error deleting penyuluh:', error);
    throw error;
  }
};

export const createPenyuluh = async (authUser, data) => {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/penyuluh/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authUser}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menambahkan data penyuluh");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating penyuluh:", error);
    throw error;
  }
};

// api.js
// Fungsi untuk mendapatkan detail penyuluh berdasarkan ID menggunakan Fetch
export const getPenyuluhById = async (authUser, id) => {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/penyuluh/get/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authUser}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching penyuluh:", error);
    throw error;
  }
};

// Fungsi untuk mengupdate data penyuluh menggunakan Fetch
export const updatePenyuluh = async (authUser, data) => {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/penyuluh/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authUser}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menambahkan data penyuluh");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating penyuluh:", error);
    throw error;
  }
};