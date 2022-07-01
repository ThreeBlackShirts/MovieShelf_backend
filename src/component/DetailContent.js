import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut} from './MovieContent';
import MovieService from 'service/MovieService';
import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import ReviewContent from './ReviewContent';

class DetailContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            target: localStorage.getItem("target") || '',
            isLoading: true,
            movieDetail: {},
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.detailhMovie = this.detailhMovie.bind(this)
    }

    detailhMovie() {
        console.log("detail Movie")
        if(this.state.target !== null && this.state.target !== ""){
            console.log(this.state.target +" detail")
            MovieService
                .detail(this.state.target)
                .then((response) => {
                    localStorage.removeItem("target")
                    this.setState({ movieDetail: response.data.data, isLoading: false })
                    console.log(this.state.movieDetail)
                }).catch(() => {
                    console.log("detail failed")
                    alert("detail fail");
                });
        }else{
            console.log("target error")
            history.back()
        }
    }

    componentDidMount() {
        this.detailhMovie()
    }

    goBackBtn(){
        console.log("goback btn clicked!")
        history.back()
    }

    goWriteReview(){
        console.log("going to writereview")
        //무비 정보를 가져오는 기본키 받아서 넘겨주고 writereview에서 영화 정보 기본키로 호출하기
        return(
            <ReviewContent movieId="{}"/>
        );
    }

    render() {
        const { isLoading, movieDetail} = this.state;
        return (
            <div id='detailpage-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={this.goBackBtn}/></div>
                <div id='detailpage-info-box'>
                    { isLoading ? "Loading..." : < MovieDetailTitle title={movieDetail.movieTitle} /> }
                    <div id='detailpage-info-anchor'>
                        <a href='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>주요 정보</a>
                        <a href='#detailpage-img-trailer' className='detailpage-info-anchor-a'>트레일러</a>
                        <a href='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>스틸컷</a>
                        <a href='#detailpage-review-box' className='detailpage-info-anchor-a'>평점/리뷰</a>
                    </div>
                    <div id='detailpage-info-majorinfo'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>주요 정보<hr className='detailpage-info-hr-right'/></h4>
                        { isLoading ? "Loading..." : 
                                <MovieDetail  key={movieDetail.moviePoster}
                                    poster={movieDetail.moviePoster}
                                    director={movieDetail.movieDirector}
                                    nation={movieDetail.movieNation}
                                    actor={movieDetail.movieActor}
                                    releaseDate={movieDetail.movieReleaseDate}
                                    filmrate={movieDetail.movieFilmrate}
                                    runningTime={movieDetail.movieRunningTime}
                                    genres={movieDetail.movieGenres}
                                    contentBold={movieDetail.movieContentBold}
                                    contentDetail={movieDetail.movieContentDetail} />
                        }
                    </div>
                </div>
                <div id='detailpage-img-box'>
                    <div id='detailpage-img-trailer'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>트레일러<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { isLoading ? "Loading..." : movieDetail.movieTrailer.map( movie => (
                                                <MovieDetailTrailer  key={movie}
                                                    trailer={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id='detailpage-img-stillcut'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>스틸컷<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { isLoading ? "Loading..." : movieDetail.movieStillcut.map( movie => (
                                                <MovieDetailStillcut key={movie}
                                                    stillcut={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='detailpage-review-box'>
                    <h4 className='detailpage-box-title'>
                        <hr className='detailpage-info-hr-left'/>
                        평점/리뷰
                        <hr className='detailpage-info-hr-right'/>
                    </h4>
                    <div id='detailpage-reviews-review-table-wrap'>
                        <table id='detailpage-reviews-review-table'>
                            <thead>
                                <tr>
                                    <td className='detailpage-reviews-review'>
                                        <div className='detailpage-reviews-review-profile'>
                                            <div className='detailpage-reviews-review-profile-img-wrap'><img className='detailpage-reviews-review-profile-img' src={require('../images/test/testprofile.png')} /> </div>
                                            <div className='detailpage-reviews-review-profile-name'>이름</div>
                                        </div>
                                        <div className='detailpage-reviews-review-content'>
                                            <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
                                            <div className='detailpage-reviews-review-content-text'>한줄평</div>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <br/>
                    <div id='detailpage-reviews-pagecontroller'>
                        <button id='detailpage-reviews-go-review' onClick={this.goWriteReview}>리뷰 쓰기</button>
                    </div>
                </div>
                <div className='detailpage-blank'>
                    <br></br>
                </div>

            </div>
    );
    }
}

export default DetailContent;