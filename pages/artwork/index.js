import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from 'next/error'
import { ArtworkCard } from "../../components/ArtworkCard";
import { Pagination } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Artwork(props) {
    const PER_PAGE = 12
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(0)
    const [artListDisplay, setartListDisplay] = useState("")
    


    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const fetcher = (url) => fetch(url).then((res) => res.json())
  
    const { data, error } = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/search?' + finalQuery, fetcher)

    function previousPage() {
        if (page > 1) { setPage(page-1) }
    }

    function nextpage() {
        if (page < artworkList.length ) { setPage(page + 1) }
    }

    useEffect(() => {
        let results = []

        if (data != undefined && data != null) {

            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }

            setArtworkList(results);
            setPage(1)

        } else {
            setArtworkList(null) 
        }

        if (error) {
            return <Error statusCode={404} />
        }

    }, [data])


    useEffect(() => {
        if (artworkList == undefined || artworkList == null || artworkList[page-1].length==0)
        {
            setartListDisplay(<><h4>Nothing Here</h4><p>Try searching for something else</p></>)
            return
        }

        let display = artworkList[page - 1].map(currentObjectID => {
            return (<Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>)
        })

        display = <Row className='gy-4'> {display}  </Row>
        setartListDisplay(display)
    }, [page])

    return (
        <>
            {artListDisplay}
            {
                artworkList && 
                <Pagination>
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextpage} />
                </Pagination>
            }

        </>
        )
}