
export default function TenantOverview(props){
    function handleReadClick(){
        props.handleClick({...props.reading})
        props.state(prev => !prev)
    }
    return (
            <div className="tenant">
                <div className="tenant-reading">
                    <h3>Tenant: <span className="data">{props.reading.tenantName}</span></h3>
                    <p>Previous readings: <span className="data">{props.reading.reading}</span></p>
                    <p>Units to be paid: <span className="data">{props.reading.toBePaid}</span></p>
                    <p>Units paid: <span className="data">{props.reading.paid}</span></p>
                    <p>Deficit: <span className="data">{props.reading.deficit}</span></p>
                    <p>Reading Date: <span className="data">{props.reading.readingDate}</span></p>
                    <p>Next Reading: <span className="data">{props.reading.nextReadingDate}</span></p>
                </div>
                <button onClick={handleReadClick}>READ</button>
            </div>
    )
}