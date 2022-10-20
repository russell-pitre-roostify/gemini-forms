
interface DataSource {
    /**
     * Type of data source.
     */
    type: DataSourceType;
    /**
     * Description of the data source.
     */
    description: string;
}

/**
 * Type of data source.
 */
enum DataSourceType {
    Array = 'ARRAY',
    Remote = 'REMOTE',
}

export interface StaticDataSource extends DataSource {
    /**
     * Type of data source.
     */
    type: DataSourceType.Array
    /**
     * Type of data source.
     */
    data: Array<any>;
}

export interface RemoteDataSource extends DataSource {
    /**
     * Type of data source.
     */
    type: DataSourceType.Remote
    /**
     * Remote options for data source.
     */
    options: RemoteDataSourceOptions;
}

export interface RemoteDataSourceOptions {
    /**
     * Url to call to retrieve data
     */
    url: string;
    /**
     * HTTP Method.
     */
    method: "POST" | "GET";
    /**
     * POST body.
     */
    body?: object;
    /**
     * URL parameters.
     */
    params?: object
}
