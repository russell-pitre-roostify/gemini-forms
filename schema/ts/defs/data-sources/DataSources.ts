import {RemoteDataSource, StaticDataSource} from "./DataSource";

export interface DataSources {
    /**
     * Data sources.
     */
    [key: string]: StaticDataSource | RemoteDataSource;
}