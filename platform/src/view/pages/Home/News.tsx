import React, { useState } from "react";
import { Link } from "react-router-dom";

function News(props) {
  const { topic, loading } = props;
  
  return (
    <div className="crypto-news-container" style={{ maxWidth: "400px", margin: "0 auto" }}>
      {/* News Section Header */}
      <div className="news-section-header">
        <div className="news-sections-title">Crypto News</div>
        <Link to="/news" className="news-see-all remove_blue">
          See All →
        </Link>
      </div>
      
      {/* News Items */}
      {topic?.map((item, index) => (
        <div key={index} className="news-item-card">
          <div>
            <img
              src={item?.cover}
              className="news-image-placeholder"
              loading="lazy"
              alt="News cover"
            />
          </div>
          <div className="news-content-wrapper">
            <div 
              className="news-headline"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item?.meta?.title}
            </div>
            <div 
              className="news-summary"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item?.meta?.subtitle}
            </div>
            {/* <div className="news-meta-info">2 hours ago • CryptoDaily</div> */}
          </div>
        </div>
      ))}
      
      {/* Embedded styles – consistent with Profile & Home pages */}
      <style>{`
        .crypto-news-container {
          padding: 0 15px 20px;
        }

        .news-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 5px 10px;
          margin-bottom: 8px;
        }

        .news-sections-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          padding-bottom: 6px;
          border-bottom: 1px solid #2a2a2e;
        }

        .news-see-all {
          font-size: 13px;
          color: #F41112;
          font-weight: 500;
          transition: color 0.2s;
          text-decoration: none;
        }
        .news-see-all:hover {
          color: #F64141;
        }

        .news-item-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background-color: #15161c;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }
        .news-item-card:hover {
          background-color: rgba(244, 17, 18, 0.05);
        }

        .news-image-placeholder {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          background-color: #0e0f14;
        }

        .news-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .news-headline {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .news-summary {
          color: #aaaaaa;
          font-size: 12px;
          line-height: 1.4;
        }

        .news-meta-info {
          color: #888888;
          font-size: 11px;
          margin-top: 6px;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        @media (max-width: 480px) {
          .news-image-placeholder {
            width: 70px;
            height: 70px;
          }
          .news-headline {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default News;