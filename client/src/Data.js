
import { Buffer } from "buffer";

//This method is used to make  GET, POST, PUT, AND DELETE requests to the REST API

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = `http://localhost:5000/api${path}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //Checks if authorization is required

    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
//GET user
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //CREATE user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //GET courses
  async getCourses() {
    const response = await this.api("/courses", "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  //GET a course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

//CREATE course
async createCourse(body, username, password) {
  const response = await this.api(`/courses`, "POST", body, true, {
    username,
    password,
  }
  );
  if (response.status === 201) {
    return [];
  } else if (response.status === 400) {
    return response.json().then((data) => {
      return data.errors;
    });
  } else {
    throw new Error();
  }
}

//Update course
async updateCourse(id, body, username, password) {
  const response = await this.api(`/courses/${id}`, "PUT", body, true, {
    username,
    password,
  });
  if (response.status === 204) {
    return [];
  } else if (response.status === 400) {
    return response.json().then((data) => {
      return data.errors;
    });
  } else if (response.status === 404) {
    throw new Error("404");
  } else {
    throw new Error("505");
  }
;}


//DELETE course
async deleteCourse(id, username, password) {
  const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
    username,
    password,
  });
  if (response.status === 204) {
    return [];
  } else if (response.status === 401) {
    return null;
  } else {
    throw new Error();
  }
}
}
