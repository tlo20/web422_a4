import { Button, Card } from 'react-bootstrap'
import Error from 'next/error'
import useSWR from 'swr'
import Link from '../node_modules/next/link'

export function ArtworkCard(props) {

    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error } = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + props.objectID, fetcher)
        

    return (
            
        <>
            {error && <Error statusCode={404} />}
            {data && data.objectID &&
                
                <Card>
                    <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                        <Card.Text><span className="fw-bold">Date: </span>{data.objectDate ? data.objectDate : "N/A"}</Card.Text>
                        <Card.Text><span className="fw-bold">Classification: </span>{data.classification ? data.classification : "N/A"}</Card.Text>
                        <Card.Text><span className="fw-bold">Medium:</span> {data.medium ? data.medium : "N/A"}</Card.Text>
                        <Link legacybehavior="true" href={"/artwork/" + data.objectID} passhref="true">
                            <Button>ID: {data.objectID}</Button>
                        </Link>
                    </Card.Body>

                </Card>
            }

        </>
        )
}


export function ArtworkCardDetail(props) {

    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error } = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + props.objectID, fetcher)



    return (

        <>
            {error && <Error statusCode={404} />}
            {data && data.objectID &&

                <Card>
                    {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                        <Card.Text><span className="fw-bold">Date: </span>{data.objectDate ? data.objectDate : "N/A"}</Card.Text>
                        <Card.Text><span className="fw-bold">Classification: </span>{data.classification ? data.classification : "N/A"}</Card.Text>
                        <Card.Text><span className="fw-bold">Medium:</span> {data.medium ? data.medium : "N/A"}</Card.Text>
                        <br />  <br /> 
                        <Card.Text><span className="fw-bold">Artist: </span>{data.artistDisplayName ? data.artistDisplayName : "N/A"}  {data.artistDisplayName && <span>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> )</span>}</Card.Text>
                        <Card.Text><span className="fw-bold">Credit Line:</span> {data.creditLine ? data.creditLine : "N/A"}</Card.Text>
                        <Card.Text><span className="fw-bold">Dimensions: </span>{data.dimensions ? data.dimensions : "N/A"}</Card.Text>
                        <Link legacybehavior="true" href={"/artwork/" + data.objectID} passhref="true">
                            <Button>ID: {data.objectID}</Button>
                        </Link>
                    </Card.Body>

                </Card>
            }

        </>
    )
}


