export interface IAuthLoginParams {
  phone: string,
  password: string
}

export interface IApiAuthLogin {
  accessToken: string,
  refreshToken: string,
  expiresIn: number
}

export interface IUsersCreateParams {
  firstName: string,
  lastName: string,
  phone: string,
  password: string,
  code: string
}

export interface IUser {
  id?: number,
  refreshToken?: string,
  firstName: string,
  lastName: string,
  avatar?: string,
  email?: string,
  phone?: string,
  password?: string,
  updatedAt?: string,
  createdAt?: string
}

export interface IApiRefreshTokenParams {
  refreshToken: string,
  companyId: number,
  userId: number,
  role: string
}

export interface IApiRefreshToken {
  accessToken: string,
  expiresIn: number
}

export interface IUsersConfirmationParams {
  phone: string,
  type: 'REGISTRATION' | 'RESET_PASSWORD'
}

export interface IUsersConfirmation {
  message: string
}

export interface IRegistrationUserParams {
  firstName: string,
  lastName: string,
  phone: string,
  description?: string,
  status?: string,
  avatarId?: number,
  password?: string,
  code?: string
}

export interface IAvatar {
  createdAt: string,
  filename: string,
  id: number,
  mimetype: string,
  path: string,
  updatedAt: string
}

export interface IRegistrationUser {
  specialists?: any,
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  avatar: IAvatar,
  updatedAt: string,
  createdAt: string
}

export interface ICompaniesCreateParams {
  name?: string,
  cityId?: number,
  typeId?: number,
  logoId?: number,
  userId?: number,
  address?: string,
  phone?: string,
  description?: string,
  viber?: string,
  telegram?: string,
  instagram?: string,
  facebook?: string
}

export interface IProcedureParams {
  id?: number,
  name: string,
  price: number,
  duration: number,
  description?: string
}

export interface IProcedure {
  id: number,
  companyId: number,
  createdAt: Date,
  duration: number,
  price: number,
  name: string,
  updatedAt: Date,
  description: string
}

export interface ICompanyInfo {
  id: number,
  userId: number,
  name: string,
  logo: string,
  type: string,
  createdAt: Date,
  updatedAt: Date
}

export interface IAppointmentCreateParams {
  date: string,
  total: number,
  phone?: string,
  status: string,
  isQueue?: boolean,
  fullName?: string,
  startTime: string,
  specialistId: number,
  procedures: number[],
  description: string,
  hasRemindSMS: boolean,
  hasCreationSMS: boolean
}

export interface IRestoreUserParams {
  phone: string,
  newPassword: string,
  code: string
}

export interface ISmscSendParams {
  login: string,
  phone: string,
  message: string,
  password: string
}

export interface ITimeOffGetAllParams {
  specialistId?: number,
  date: string
  // startDateTime: string
  // endDateTime: string
}

export interface ITimeOffCreateParams {
  specialistId: number,
  startDateTime: string,
  endDateTime: string,
  description?: string
}

export interface IAppointmentAllParams {
  date: string
}

export interface ISmsCreateParams {
  login: string,
  password: string,
  hasCreationSMS: boolean,
  hasRemindSMS: boolean,
  remindSMSMinutes: number
}

export interface IAnalyticsSimpleParams {
  startDate: string,
  endDate: string
}

export interface IAnalyticsCalendarParams {
  startDate: string,
  endDate: string
}

export interface IAnalyticsFinanceParams {
  startDate: string,
  endDate: string,
  specialistId?: number
}

export interface ICategoryParams {
  name: string,
  type: 'PROCEDURE'
}

export interface ICategory {
  id: number,
  type: string,
  name: string,
  createdAt?: string,
  updatedAt?: string
}

export const factory = (send) => ({
  auth: {
    login (params: IAuthLoginParams) : Promise<IApiAuthLogin> {
      return send('login', params)
    },

    registration (params: IRegistrationUserParams) : Promise<IRegistrationUser> {
      return send('users', params)
    },

    restore (params: IRestoreUserParams) : Promise<any> {
      return send('users/restore', params)
    },

    logout (): Promise<Boolean> {
      return send('logout', {}, 'POST')
    },

    refreshToken (params: IApiRefreshTokenParams): Promise<IApiRefreshToken> {
      return send('token', params, 'PUT')
    }
  },

  companies: {
    byId (id: number): Promise<any> {
      return send(`companies/${id}`, null, 'GET')
    },

    create (params: ICompaniesCreateParams) : Promise<any> {
      return send('companies', params)
    },

    update (id: number, params: ICompaniesCreateParams) : Promise<any> {
      return send(`companies/${id}`, params, 'PUT')
    }

    // all () : Promise<ICompanyInfo[]> {
    //   return send('companies', null, 'GET')
    // }
  },

  profile: {
    get () : Promise<IRegistrationUser> {
      return send('users/profile', null, 'GET')
    }
  },

  specialist: {
    create (params: IRegistrationUserParams) : Promise<IRegistrationUser> {
      return send('specialists', params)
    },

    update ({ id, ...params }: any) : Promise<IRegistrationUser> {
      return send(`specialists/${id}`, params, 'PUT')
    },

    all (params: any): Promise<any> {
      return send('specialists', params, 'GET')
    },

    bulk (params: any) {
      return send('specialists/bulk', params, 'PUT')
    },

    procedures (id: number) {
      return send(`specialists/${id}/procedures`, null, 'GET')
    },

    setProcedures (id: number, params: any) {
      return send(`specialists/${id}/procedures`, params, 'PUT')
    },

    remove (id: number) {
      return send(`specialists/${id}`, {}, 'DELETE')
    }
  },

  users: {
    create (params: IUsersCreateParams) : Promise<IRegistrationUser> {
      return send('users', params)
    },

    confirmation (params: IUsersConfirmationParams) : Promise<IUsersConfirmation> {
      return send('users/confirmation', params)
    }
  },

  categories: {
    all (): Promise<ICategory[]> {
      return send('categories', null, 'GET')
    },

    create (params: ICategoryParams): Promise<ICategory> {
      return send('categories', params)
    },

    update (id: number, params: ICategoryParams): Promise<ICategory> {
      return send(`categories/${id}`, params, 'PUT')
    },

    remove (id: number): Promise<boolean> {
      return send(`categories/${id}`, {}, 'DELETE')
    }
  },

  procedures: {
    create (params: IProcedureParams) : Promise<IProcedure> {
      return send('procedures', params)
    },

    remove (id: number) : Promise<any> {
      return send(`procedures/${id}`, {}, 'DELETE')
    },

    update (id: number, params: IProcedureParams) : Promise<IProcedure> {
      return send(`procedures/${id}`, params, 'PUT')
    },

    all () : Promise<IProcedure[]> {
      return send('procedures', null, 'GET')
    }
  },

  appointments: {
    all (params: any) : Promise<any> {
      return send('appointments', params, 'GET')
    },

    queue (): Promise<any> {
      return send('appointments/queue', null, 'GET')
    },

    create (params: IAppointmentCreateParams) : Promise<any> {
      return send('appointments', params)
    },

    update (id: number, params: IAppointmentCreateParams) : Promise<any> {
      return send(`appointments/${id}`, params, 'PUT')
    },

    remove (id: number) : Promise<any> {
      return send(`appointments/${id}`, {}, 'DELETE')
    },

    availableTime (params: any) : Promise<any> {
      return send('appointments/available-time', params)
    }
  },

  files: {
    all (id: number, params: any): Promise<any> {
      return send(`files/${id}`, params, 'GET')
    },

    remove (id: number) {
      return send(`files/${id}`, {}, 'DELETE')
    }
  },

  cities: {
    all () : Promise<any> {
      return send('cities', null, 'GET')
    }
  },

  companyTypes: {
    all () : Promise<any> {
      return send('companies/my/types', null, 'GET')
    }
  },

  timeOff: {
    all (params: ITimeOffGetAllParams): Promise<any> {
      return send('timeoff', params, 'GET')
    },

    create (params: ITimeOffCreateParams): Promise<any> {
      return send('timeoff', params)
    },

    update (id: number, params: ITimeOffCreateParams): Promise<any> {
      return send(`timeoff/${id}`, params, 'PUT')
    },

    delete (id: number): Promise<any> {
      return send(`timeoff/${id}`, {}, 'DELETE')
    }
  },

  public: {
    specialistsByCompanyId (params: any): Promise<any> {
      return send('public/specialists', params, 'GET')
    },

    proceduresByCompanyId (params: any): Promise<any> {
      return send('public/procedures', params, 'GET')
    },

    hoursSlots (params: any): Promise<any> {
      return send('public/appointments/available-time', params)
    },

    appointmentCreate (params: any): Promise<any> {
      return send('public/appointments', params)
    },

    companyById (id: number): Promise<any> {
      return send(`public/companies/${id}`, null, 'GET')
    }
  },

  timetable: {
    get (id: number): Promise<any> {
      return send(`public/timework/${id}`, null, 'GET')
    }
  },

  analytics: {
    simple (params: IAnalyticsSimpleParams): Promise<any> {
      return send('companies/my/stats', params, 'GET')
    },

    calendar (params: IAnalyticsCalendarParams): Promise<any> {
      return send('analytics/calendar', params, 'GET')
    },

    finance (params: IAnalyticsFinanceParams): Promise<any> {
      return send('analytics/finance', params, 'GET')
    }
  },

  sms: {
    settingCreate (params: ISmsCreateParams) : Promise<any> {
      return send('companies/my/settings', params)
    },

    settingUpdate (params: any) : Promise<any> {
      return send('companies/my/settings', params, 'PUT')
    },

    settingRemove () : Promise<any> {
      return send('companies/my/settings', {}, 'DELETE')
    },

    balance () : Promise<any> {
      return send('sms/balance', null, 'GET')
    }
  }
})
