export interface IExperienceCard {
    role: string,
    company: string,
    companyLogo: string,
    date: string,
    desc: string,
    short_note: string,
    keyNotes?: string[]
}
export interface IWorkExperience{
    display:boolean,
  experience:IExperienceCard[]
}
