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
