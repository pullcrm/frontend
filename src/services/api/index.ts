export interface IAuthLoginParams {
  phone: string
  password: string
}

export interface IApiAuthLogin {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface IUsersCreateParams {
  firstName: string
  lastName: string
  phone: string
  password: string
  code: number
}

export interface IUser {
  id?: number
  refreshToken?: string
  firstName: string
  lastName: string
  avatar?: string
  email?: string
  phone?: string
  password?: string
  updatedAt?: string
  createdAt?: string
}

export interface IApiRefreshTokenParams {
  refreshToken: string
  companyId: number
  role: string
}

export interface IApiRefreshToken {
  accessToken: string
  expiresIn: number
}

export interface IUsersConfirmationParams {
  phone: string
}

export interface IUsersConfirmation {
  message: string
}

export interface IRegistrationUserParams {
  firstName: string
  lastName: string
  phone: string
  password?: string
  code: number
}

export interface IRegistrationUser {
  id: number
  firstName: string
  lastName: string
  phone: string
  updatedAt: string
  createdAt: string
}

export interface IProcedure {
  name: string
  price: number
  duration: number
}

export interface ICompaniesCreateParams {
  name: string
  cityId: number
  categoryId: number
}

export interface IProcedureParams {
  name: string
  price: number
  duration: number
}

export interface IProcedure {
  id: number
  companyId: number
  createdAt: Date
  duration: number
  price: number
  name: string
  updatedAt: Date
}

export interface ICompanyInfo {
  id: number
  userId: number
  name: string
  logo: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export const factory = (send) => ({
  auth: {
    login(params: IAuthLoginParams) : Promise<IApiAuthLogin> {
      return send('login', params)
    },

    registration(params: IRegistrationUserParams) : Promise<IRegistrationUser> {
      return send('users', params)
    },

    logout(): Promise<Boolean> {
      return send('logout', null, 'DELETE')
    },

    refreshToken(params: IApiRefreshTokenParams): Promise<IApiRefreshToken> {
      return send('token', params, 'PUT')
    }
  },

  companies: {
    create(params: ICompaniesCreateParams) : Promise<any> {
      return send('companies', params)
    },
    
    all() : Promise<ICompanyInfo[]> {
      return send('companies', null, 'GET')
    }
  },

  employee: {
    create(params: IRegistrationUserParams) : Promise<IRegistrationUser> {
      return send('companies/my/employers', params)
    },

    all(): Promise<any> {
      return send('companies/my/employers', null, 'GET')
    }
  },

  approaches: {
    my() : Promise<any[]> {
      return send('approaches', null, 'GET')
    },

    current() : Promise<any> {
      return send('approaches/current', null, 'GET')
    }
  },

  procedures: {
    create(params: IProcedureParams) : Promise<IProcedure> {
      return send('procedures', params)
    },

    all() : Promise<IProcedure[]> {
      return send('procedures', null, 'GET')
    }
  },

  users: {
    create(params: IUsersCreateParams) : Promise<IRegistrationUser> {
      return send('users', params)
    },

    confirmation(params: IUsersConfirmationParams) : Promise<IUsersConfirmation> {
      return send('users/confirmation', params)
    },

    profile() : Promise<IRegistrationUser> {
      return send('users/profile', null, 'GET')
    },

    all(): Promise<IUser[]> {
      return send('users', null, 'GET')
    }
  },

  files: {
    create(params: any) : Promise<any> {
      return send('files', params, 'FORM')
    }
  },

  cities: {
    all() : Promise<any> {
      return send('cities', null, 'GET')
    }
  },

  categories: {
    all() : Promise<any> {
      return send('categories', null, 'GET')
    }
  }
})
