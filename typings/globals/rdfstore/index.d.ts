declare module '~rdf' {
    interface store
    {
        //text="text/turtle"  loading local data

        //text="remote"  loading remote data
        load: (text, querystring, callback: (err, results) => void) => void;


        execute: (querystring, callback: (err, results) => void) => void;
    }



    export function create(callback: (err, store: store) => void);
}

declare module 'rdfstore' {
    export * from '~rdf';
}


