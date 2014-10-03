function ShareWidget(base_element) {
    var self = this;
    self.objects = {};

    self.init = function() {
        var structure = [
            {
                tag: 'a',
                href: '#',
                className: 'opener share-btn',
                text: 'Share',
                childs: [
                    {tag: 'i', className: 'icon-share'},
                ]
            },
            {
                tag: 'div',
                className: 'dropdown-box share-widget',
                childs: [
                    {tag: 'span', className: 'heading', text: 'Share'},
                    {
                        tag: 'ul',
                        className: 'social-networks',
                        childs: [
                            {tag: 'li', target: '_blank', className: 'icon-facebook', text: 'facebook'},
                            {tag: 'li', target: '_blank', className: 'icon-twitter', text: 'twitter'},
                            {tag: 'li', target: '_blank', className: 'icon-linkedin', text: 'linkedin'},
                            {tag: 'li', target: '_blank', className: 'icon-google', text: 'google'}
                        ]
                    }
                ]
            }
        ];

        self.build_elements(base_element, structure);
    }

    self.build_elements = function(parent, elements) {
        $.each(elements, function(_, element) {
            var _node = document.createElement(element.tag);
            if (element.text !== undefined) {
                _node.appendChild(document.createTextNode(element.text));
            }

            if (element.href !== undefined) {
                _node.href = element.href;
            }
            if (element.target !== undefined) {
                _node.target = element.target;
            }

            if (element.childs !== undefined) {
                self.build_elements(_node, element.childs);
            }
            
            parent.appendChild(_node);
        });
        console.log(parent, elements);
    }

    self.init();
    /*
        <a class="opener share-btn" href="#"><i class="icon-share"></i>SHARE</a>
        <div class="dropdown-box share-widget">
            <span class="heading">Share</span>
            <ul class="social-networks">
                <li><a href="#" target="_blank" class="icon-facebook">facebook</a></li>
                <li><a href="#" target="_blank" class="icon-twitter">twitter</a></li>
                <li><a href="#" target="_blank" class="icon-linkedin">linkedin</a></li>
                <li><a href="#" target="_blank" class="icon icon-google">google</a></li>
            </ul>
            <form action="#">
                <fieldset>
                    <label for="item1">Share link</label>
                    <div class="input-wrap"><input class="form-control share-widget-input" type="text"></div>
                    <div class="btn-holder">
                        <a class="close-share btn btn-blue btn-close">Cancel</a>
                    </div>
                </fieldset>
            </form>
        </div>
    </li>
    */
}