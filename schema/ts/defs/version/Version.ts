export type Version = {
    /**
     * Form version identifier.
     */
    id: string;
    /**
     * Version number of the form.
     */
    number: number;
    /**
     * Publishing status the form.
     */
    status: FormPublishingStatus;
}

/**
 * Current publishing status of form
 */
export enum FormPublishingStatus {
    Active = 'ACTIVE',
    Draft = 'DRAFT',
}