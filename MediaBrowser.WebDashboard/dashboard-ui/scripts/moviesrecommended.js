﻿(function ($, document) {

    function getRecommendationHtml(recommendation) {

        var html = '';

        var title = '';

        switch (recommendation.RecommendationType) {

            case 'SimilarToRecentlyPlayed':
                title = Globalize.translate('RecommendationBecauseYouWatched').replace("{0}", recommendation.BaselineItemName);
                break;
            case 'SimilarToLikedItem':
                title = Globalize.translate('RecommendationBecauseYouLike').replace("{0}", recommendation.BaselineItemName);
                break;
            case 'HasDirectorFromRecentlyPlayed':
            case 'HasLikedDirector':
                title = Globalize.translate('RecommendationDirectedBy').replace("{0}", recommendation.BaselineItemName);
                break;
            case 'HasActorFromRecentlyPlayed':
            case 'HasLikedActor':
                title = Globalize.translate('RecommendationStarring').replace("{0}", recommendation.BaselineItemName);
                break;
        }

        html += '<h1 class="listHeader">' + title + '</h1>';

        html += '<div>';
        html += LibraryBrowser.getPosterViewHtml({
            items: recommendation.Items,
            lazy: true,
            shape: 'portrait',
            overlayText: true
        });
        html += '</div>';

        return html;
    }

    $(document).on('pageinit', "#moviesRecommendedPage", function () {

        var page = this;

        $('.recommendations', page).createCardMenus();

    }).on('pagebeforeshow', "#moviesRecommendedPage", function () {

        var parentId = LibraryMenu.getTopParentId();

        var screenWidth = $(window).width();

        var page = this;

        var options = {

            SortBy: "DatePlayed",
            SortOrder: "Descending",
            IncludeItemTypes: "Movie",
            Filters: "IsResumable",
            Limit: screenWidth >= 1920 ? 12 : (screenWidth >= 1600 ? 8 : 6),
            Recursive: true,
            Fields: "PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",
            CollapseBoxSetItems: false,
            ParentId: parentId,
            ImageTypeLimit: 1,
            EnableImageTypes: "Primary,Backdrop,Banner,Thumb"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            if (result.Items.length) {
                $('#resumableSection', page).show();
            } else {
                $('#resumableSection', page).hide();
            }

            $('#resumableItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                preferThumb: true,
                shape: 'backdrop',
                overlayText: true,
                showTitle: true,
                lazy: true

            })).lazyChildren().trigger('create');

        });

        var url = ApiClient.getUrl("Movies/Recommendations", {

            userId: Dashboard.getCurrentUserId(),
            categoryLimit: screenWidth >= 1200 ? 4 : 3,
            ItemLimit: screenWidth >= 1920 ? 10 : (screenWidth >= 1600 ? 8 : (screenWidth >= 1200 ? 7 : 6)),
            Fields: "PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",
            ImageTypeLimit: 1,
            EnableImageTypes: "Primary,Backdrop,Banner,Thumb"
        });

        ApiClient.getJSON(url).done(function (recommendations) {

            if (!recommendations.length) {

                $('.noItemsMessage', page).show();
                $('.recommendations', page).html('');
                return;
            }

            var html = recommendations.map(getRecommendationHtml).join('');

            $('.noItemsMessage', page).hide();
            $('.recommendations', page).html(html).lazyChildren();
        });

    });


})(jQuery, document);