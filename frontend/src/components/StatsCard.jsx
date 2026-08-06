import "../styles/statcard.css";

function StatCard({ title, value }) {

    let cardClass = "stat-card";
    let icon = "📊";

    switch (title) {

        case "Total Jobs":
            cardClass += " total";
            icon = "📋";
            break;

        case "Pending":
            cardClass += " pending";
            icon = "🟡";
            break;

        case "Running":
            cardClass += " running";
            icon = "🔵";
            break;

        case "Completed":
            cardClass += " completed";
            icon = "🟢";
            break;

        case "Failed":
            cardClass += " failed";
            icon = "🔴";
            break;

        case "Avg Time (sec)":
            cardClass += " average";
            icon = "⏱️";
            break;

        case "Queue Length":
            icon = "📦";
            break;

        case "Highest Priority":
            icon = "🔥";
            break;

        case "Lowest Priority":
            icon = "🧊";
            break;

        case "Average Priority":
            icon = "📈";
            break;

        case "Oldest Pending":
            icon = "⏳";
            break;

        case "Newest Pending":
            icon = "✨";
            break;

        default:
            break;
    }

    return (

        <div className={cardClass}>

            <div className="stat-header">

                <span className="stat-icon">
                    {icon}
                </span>

                <span className="stat-title">
                    {title}
                </span>

            </div>

            <div className="stat-value">
                {value}
            </div>

        </div>

    );

}

export default StatCard;