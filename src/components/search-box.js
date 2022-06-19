import React from "react"
import {Button, Modal, Form} from 'react-bootstrap';
import CloseButton from "./close-button";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import {AiOutlineClear} from "react-icons/ai";
import {FaHistory, FaSearch} from "react-icons/fa";
import ResponsiveSize from "../hooks/responsive-size";
import ResponsiveHeader from "./responsive-header";
import {GetSearchItems} from "../hooks/get-search-items";
import SearchResultPreview from "./search-result-preview";

class RecentSearchItem extends React.Component {
    itemClick = () => {
      this.props.restoreRecentSearchFunction(this.props.value)
    }
  
    render() {
      return(
        <Button style={{border: `none`, backgroundColor: "white", color: "#017BFF"}} onClick={this.itemClick} className="my-3 mx-1">
          {this.props.value}
        </Button>
      )
    }
}

class SearchBoxMain extends React.Component {
    state = {
        show: false,
        searchRecent: new Set(), 
        searchQueue: [],
        searchQueueIndex: -1,
        forwardButtonDisabled: true,
        backButtonDisabled: true,
        historyButtonDisabled: true,
        showRecentSearch: false,
        currentSearchItem: "Search"
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    searchButton = () => {
        var searchItem = document.getElementById("search-field").value.toLowerCase();
        document.getElementById("search-field").value = "";
        if(this.state.searchQueueIndex !== this.state.searchQueue.length - 1) {
          this.state.searchQueue = this.state.searchQueue.slice(0, this.state.searchQueueIndex + 1)
        }
        
        this.state.searchQueue.push(searchItem);
        this.state.searchRecent.add(searchItem);
        this.state.searchQueueIndex = this.state.searchQueueIndex + 1;
    
        this.setState({currentSearchItem: searchItem});
        this.setState({historyButtonDisabled: false});
        this.setState({backButtonDisabled: false});
        this.setState({forwardButtonDisabled: false});
    }

    forwardSearch = () => {
        this.state.searchQueueIndex = (this.state.searchQueueIndex + 1) % this.state.searchQueue.length;
        this.setState((state) => ({currentSearchItem: state.searchQueue[state.searchQueueIndex]}))
    }
    
    backSearch = () => {
        if(this.state.searchQueueIndex > 0) {
          this.state.searchQueueIndex = this.state.searchQueueIndex - 1;
        }
        else {
          this.state.searchQueueIndex = this.state.searchQueue.length - 1;
        }
    
        this.setState((state) => ({currentSearchItem: state.searchQueue[state.searchQueueIndex]}))
    }
    
    showRecentSearchWindow = () => {
        this.setState({showRecentSearch: true})
    }
    
    hideRecentSearchWindow = () => {
        this.setState({showRecentSearch: false})
    }
    
    restoreRecentSearch = (recentSearch) => {
        if(this.state.searchQueue.includes(recentSearch)) {
          this.state.searchQueueIndex = this.state.searchQueue.indexOf(recentSearch)
        }
        else {
          if(this.state.searchQueueIndex !== this.state.searchQueue.length - 1) {
            this.state.searchQueue = this.state.searchQueue.slice(0, this.state.searchQueueIndex + 1)
          }
          
          this.state.searchQueue.push(recentSearch);
          this.state.searchQueueIndex = this.state.searchQueueIndex + 1;
        }
    
        this.setState({currentSearchItem: recentSearch})
        this.hideRecentSearchWindow();
    }
    
    clearRecentSearch = () => {
        this.setState({searchRecent: new Set()});
        this.setState({historyButtonDisabled: true});
        this.hideRecentSearchWindow();
    }

    render() {
        var results = []
        for(var i = 0; i < this.props.searchItems.length; i++) {
            var currentSearchQuery = this.state.searchQueue[this.state.searchQueueIndex];
            var found = false;
            
            for(var j = 0; j < this.props.searchItems[i].contents.length; j++) {
                if(this.props.searchItems[i].contents[j].toLowerCase().includes(currentSearchQuery)) {
                    found = true;
                    break;
                }
            }

            if(found) {
                results.push(
                    this.props.searchItems[i].display
                )
            }
        }

        var recentSearches = []
        this.state.searchRecent.forEach((value, index) => {
            recentSearches.push(
                <div style={{textAlign: "center"}} key={index}>
                    <RecentSearchItem restoreRecentSearchFunction={this.restoreRecentSearch} value={value} />
                </div>
            )
        })

        var currentSearchItemNum = "(" + (this.state.searchQueueIndex + 1).toString() + " of " + this.state.searchQueue.length.toString() + ")";

        return(
            <>
                <Button className="menu-button mx-1" lang="en" dir="ltr" onClick={this.handleShow}>
                    <FaSearch aria-hidden={true} />
                </Button>
                <Modal size="xl" show={this.state.show} onHide={this.handleClose} centered scrollable>
                    <Modal.Header className="justify-content-center bold-text px-0">
                        <section className="px-0">
                            <div>
                                <section id="search-bar" className="justify-content-center" expand="lg">
                                    <section className="m-1">
                                        <Form.Control id="search-field" className="hover-shadow" style={{textAlign: "center", fontSize: this.props.fontSize, borderBottom: "2px solid #017BFF", borderRadius: 0}} type="text" placeholder="Search" />
                                    </section>
                                    <section className="m-1">
                                        <Button className="m-1" style={{fontSize: this.props.fontSize}} onClick={this.showRecentSearchWindow} disabled={this.state.historyButtonDisabled}>
                                            <FaHistory aria-hidden={true} /> History
                                        </Button>
                                        <Button className="m-1" style={{fontSize: this.props.fontSize}} onClick={this.searchButton}>
                                            <FaSearch aria-hidden={true} /> Go
                                        </Button>
                                    </section>
                                </section>
                            </div>
                            <Modal size="sm" show={this.state.showRecentSearch} onHide={this.hideRecentSearchWindow} centered scrollable>
                                <Modal.Header className="justify-content-center">
                                    <Modal.Title style={{textAlign: "center"}}>
                                        <h1 lang="en" dir="ltr" style={{fontSize: "2rem", color: "#017BFF"}}>Search History</h1>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="p-0">
                                    {recentSearches}
                                </Modal.Body>
                                <Modal.Footer className="justify-content-center">
                                    <Button style={{fontSize: this.props.fontSize}} onClick={this.clearRecentSearch}>
                                        <AiOutlineClear aria-hidden={true} /> Clear
                                    </Button>
                                    <CloseButton handleClose={this.hideRecentSearchWindow} />
                                </Modal.Footer>
                            </Modal>
                        </section>
                    </Modal.Header>
                    <Modal.Body>
                        <section>
                            <div style={{color: "#017BFF"}}>
                                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{this.state.currentSearchItem}</ResponsiveHeader>
                            </div>
                            <section className="m-1">
                                <Button className="m-1" style={{fontSize: this.props.fontSize}} onClick={this.backSearch} disabled={this.state.backButtonDisabled}>
                                    <BsCaretLeftFill aria-label={"Previous Search Item Results"} />
                                </Button>
                                <span style={{color: "#017BFF"}}>{currentSearchItemNum}</span>
                                <Button className="m-1" style={{fontSize: this.props.fontSize}} onClick={this.forwardSearch} disabled={this.state.forwardButtonDisabled}>
                                    <BsCaretRightFill aria-label={"Next Search Item Results"} />
                                </Button>
                            </section>
                            <section>
                                <div className="mt-3" style={{color: "#017BFF"}}>
                                    <ResponsiveHeader level={3} maxSize={1} minScreenSize={500}>{`${results.length} Results Found:`}</ResponsiveHeader>
                                </div>
                                <section className="my-3">
                                    {results}
                                </section>
                            </section>
                        </section>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <CloseButton handleClose={this.handleClose} />
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default function SearchBox() {
    const fontSize = ResponsiveSize(0.8, "rem", 0.001, 500);

    const searchItemsRaw = GetSearchItems();
    var searchItems = [];
    for(var i = 0; i < searchItemsRaw.allFile.edges.length; i++) {
        var item = searchItemsRaw.allFile.edges[i].node;
        if(!item.relativeDirectory.includes("assets/characters/")) {
            searchItems.push({
                display: (
                    <SearchResultPreview title={item.childMarkdownRemark.frontmatter.title} synopsis={item.childMarkdownRemark.frontmatter.synopsis} category={item.childMarkdownRemark.frontmatter.category} slug={item.childMarkdownRemark.fields.slug} />
                ), 
                contents: [item.childMarkdownRemark.frontmatter.title, item.childMarkdownRemark.frontmatter.synopsis]
            })
        }
    }

    return(
        <SearchBoxMain fontSize={fontSize} searchItems={searchItems} />
    )
}