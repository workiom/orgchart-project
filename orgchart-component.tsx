import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Users, Mail, Phone, MapPin, Plus } from 'lucide-react';

const OrgChart = () => {
  // Sample organizational data
  const [orgData, setOrgData] = useState({
    id: 'ceo',
    name: 'Sarah Johnson',
    title: 'Chief Executive Officer',
    department: 'Executive',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    expanded: true,
    children: [
      {
        id: 'cto',
        name: 'Michael Chen',
        title: 'Chief Technology Officer',
        department: 'Technology',
        email: 'michael.chen@company.com',
        phone: '+1 (555) 123-4568',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        expanded: true,
        children: [
          {
            id: 'eng-mgr-1',
            name: 'Emily Rodriguez',
            title: 'Engineering Manager',
            department: 'Engineering',
            email: 'emily.rodriguez@company.com',
            phone: '+1 (555) 123-4569',
            location: 'Austin, TX',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            expanded: false,
            children: [
              {
                id: 'dev-1',
                name: 'Alex Thompson',
                title: 'Senior Developer',
                department: 'Engineering',
                email: 'alex.thompson@company.com',
                phone: '+1 (555) 123-4570',
                location: 'Austin, TX',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                children: []
              },
              {
                id: 'dev-2',
                name: 'Jessica Kim',
                title: 'Frontend Developer',
                department: 'Engineering',
                email: 'jessica.kim@company.com',
                phone: '+1 (555) 123-4571',
                location: 'Remote',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                children: []
              },
              {
                id: 'dev-3',
                name: 'Ryan Martinez',
                title: 'Backend Developer',
                department: 'Engineering',
                email: 'ryan.martinez@company.com',
                phone: '+1 (555) 123-4572',
                location: 'Austin, TX',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                children: []
              }
            ]
          },
          {
            id: 'dev-ops',
            name: 'David Park',
            title: 'DevOps Manager',
            department: 'Engineering',
            email: 'david.park@company.com',
            phone: '+1 (555) 123-4572',
            location: 'Seattle, WA',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
            expanded: false,
            children: [
              {
                id: 'devops-1',
                name: 'Anna Wilson',
                title: 'DevOps Engineer',
                department: 'Engineering',
                email: 'anna.wilson@company.com',
                phone: '+1 (555) 123-4573',
                location: 'Seattle, WA',
                avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 'cmo',
        name: 'Lisa Wang',
        title: 'Chief Marketing Officer',
        department: 'Marketing',
        email: 'lisa.wang@company.com',
        phone: '+1 (555) 123-4573',
        location: 'Los Angeles, CA',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        expanded: true,
        children: [
          {
            id: 'marketing-mgr',
            name: 'James Wilson',
            title: 'Marketing Manager',
            department: 'Marketing',
            email: 'james.wilson@company.com',
            phone: '+1 (555) 123-4574',
            location: 'Los Angeles, CA',
            avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
            expanded: true,
            children: [
              {
                id: 'content-spec',
                name: 'Sophie Martinez',
                title: 'Content Specialist',
                department: 'Marketing',
                email: 'sophie.martinez@company.com',
                phone: '+1 (555) 123-4575',
                location: 'Miami, FL',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                children: []
              },
              {
                id: 'social-mgr',
                name: 'Tom Brown',
                title: 'Social Media Manager',
                department: 'Marketing',
                email: 'tom.brown@company.com',
                phone: '+1 (555) 123-4576',
                location: 'Los Angeles, CA',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 'hr-dir',
        name: 'Robert Johnson',
        title: 'HR Director',
        department: 'Human Resources',
        email: 'robert.johnson@company.com',
        phone: '+1 (555) 123-4576',
        location: 'Chicago, IL',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        expanded: false,
        children: [
          {
            id: 'recruiter',
            name: 'Maria Garcia',
            title: 'Senior Recruiter',
            department: 'Human Resources',
            email: 'maria.garcia@company.com',
            phone: '+1 (555) 123-4577',
            location: 'Chicago, IL',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            children: []
          }
        ]
      }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [animatingNodes, setAnimatingNodes] = useState(new Set());
  const containerRef = useRef(null);

  // Toggle expansion with viewport lock
  const toggleExpansion = useCallback((nodeId) => {
    // Lock scroll position
    const container = containerRef.current;
    const scrollTop = container?.scrollTop || 0;
    const scrollLeft = container?.scrollLeft || 0;

    // Add to animating set
    setAnimatingNodes(prev => new Set(prev).add(nodeId));

    // Update the data
    const updateNode = (node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };

    setOrgData(updateNode);

    // Restore scroll position immediately and after animation
    const restoreScroll = () => {
      if (container) {
        container.scrollTop = scrollTop;
        container.scrollLeft = scrollLeft;
      }
    };

    // Restore immediately
    requestAnimationFrame(restoreScroll);
    
    // Restore after a short delay
    setTimeout(restoreScroll, 50);
    
    // Remove from animating set after animation completes
    setTimeout(() => {
      setAnimatingNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
    }, 800);
  }, []);

  // Search functionality
  const searchInTree = (node, term) => {
    if (!term) return true;
    const searchText = term.toLowerCase();
    return (
      node.name.toLowerCase().includes(searchText) ||
      node.title.toLowerCase().includes(searchText) ||
      node.department.toLowerCase().includes(searchText) ||
      (node.children && node.children.some(child => searchInTree(child, term)))
    );
  };

  // Expand all nodes
  const expandAll = useCallback(() => {
    const expandNode = (node) => ({
      ...node,
      expanded: true,
      children: node.children ? node.children.map(expandNode) : []
    });
    setOrgData(expandNode);
  }, []);

  // Collapse all nodes
  const collapseAll = useCallback(() => {
    const collapseNode = (node) => ({
      ...node,
      expanded: false,
      children: node.children ? node.children.map(collapseNode) : []
    });
    setOrgData(collapseNode);
  }, []);

  // Employee card component
  const EmployeeCard = ({ employee, isRoot = false }) => {
    if (!searchInTree(employee, searchTerm)) return null;

    const hasChildren = employee.children && employee.children.length > 0;
    const isExpanded = employee.expanded;
    const hasVisibleChildren = hasChildren && employee.children.some(child => searchInTree(child, searchTerm));
    const isAnimating = animatingNodes.has(employee.id);

    return (
      <div className="flex flex-col items-center">
        {/* Employee Card */}
        <div 
          className={`bg-white rounded-lg shadow-md border p-4 transition-all duration-300 hover:shadow-xl relative hover:scale-105 ${
            isRoot ? 'w-72' : 'w-64'
          }`}
        >
          {/* Expand/Collapse button */}
          {hasVisibleChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleExpansion(employee.id);
              }}
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border-2 border-blue-400 rounded-full p-2 hover:bg-blue-50 shadow-lg z-20 transition-all duration-200 hover:scale-110"
            >
              <div className={`transition-transform duration-500 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                <ChevronDown className="w-4 h-4 text-blue-600" />
              </div>
            </button>
          )}

          <div className="text-center">
            <img
              src={employee.avatar || '/api/placeholder/60/60'}
              alt={employee.name}
              className="w-16 h-16 rounded-full object-cover border-3 border-gray-200 mx-auto mb-3 transition-all duration-300 hover:border-blue-300"
            />
            
            <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">{employee.name}</h3>
            <p className="text-xs text-gray-600 mb-2 leading-tight">{employee.title}</p>
            
            <div className="flex justify-center mb-2">
              <span className={`text-xs px-2 py-1 rounded-full text-white transition-all duration-200 ${
                employee.department === 'Executive' ? 'bg-purple-500' :
                employee.department === 'Technology' || employee.department === 'Engineering' ? 'bg-blue-500' :
                employee.department === 'Marketing' ? 'bg-green-500' :
                employee.department === 'Human Resources' ? 'bg-orange-500' : 'bg-gray-500'
              }`}>
                {employee.department}
              </span>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-center space-x-1">
                <Mail className="w-3 h-3" />
                <span className="truncate">{employee.email.split('@')[0]}</span>
              </div>
              {employee.location && (
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{employee.location.split(',')[0]}</span>
                </div>
              )}
              {hasChildren && (
                <div className="flex items-center justify-center space-x-1 pt-1">
                  <Users className="w-3 h-3" />
                  <span>{employee.children.length} report{employee.children.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Animated Connector Line */}
        {hasVisibleChildren && (
          <div 
            className={`w-px bg-gray-400 transition-all duration-500 ease-out ${
              isExpanded ? 'h-6 opacity-100' : 'h-0 opacity-0'
            }`}
          />
        )}

        {/* Animated Children Container - Always render but control visibility */}
        <div 
          className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
            isExpanded 
              ? 'max-h-screen opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
          style={{
            maxHeight: isExpanded ? '2000px' : '0px'
          }}
        >
          {/* Inner container for additional animations */}
          <div className={`transition-all duration-500 ease-out ${
            isExpanded ? 'transform translate-y-0' : 'transform -translate-y-8'
          }`}>
            {/* Horizontal Connector Line */}
            {hasVisibleChildren && employee.children.filter(child => searchInTree(child, searchTerm)).length > 1 && (
              <div 
                className={`absolute top-6 left-1/2 h-px bg-gray-400 transition-all duration-600 ease-out ${
                  isExpanded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
                style={{ 
                  width: `${(employee.children.filter(child => searchInTree(child, searchTerm)).length - 1) * 280}px`,
                  transform: `translateX(-${((employee.children.filter(child => searchInTree(child, searchTerm)).length - 1) * 280) / 2}px)`,
                  transitionDelay: isExpanded ? '200ms' : '0ms'
                }}
              />
            )}
            
            {/* Children Grid */}
            {hasVisibleChildren && (
              <div className="flex justify-center space-x-6 pt-0">
                {employee.children
                  .filter(child => searchInTree(child, searchTerm))
                  .map((child, index) => (
                    <div 
                      key={child.id} 
                      className={`flex flex-col items-center relative transition-all duration-700 ease-out ${
                        isExpanded 
                          ? 'opacity-100 transform translate-y-0 scale-100' 
                          : 'opacity-0 transform translate-y-12 scale-90'
                      }`}
                      style={{ 
                        transitionDelay: isExpanded ? `${300 + index * 100}ms` : '0ms'
                      }}
                    >
                      {/* Vertical Connector */}
                      <div 
                        className={`w-px bg-gray-400 transition-all duration-500 ease-out ${
                          isExpanded ? 'h-6 opacity-100' : 'h-0 opacity-0'
                        }`}
                        style={{ 
                          transitionDelay: isExpanded ? `${250 + index * 50}ms` : '0ms'
                        }}
                      />
                      
                      {/* Child Card */}
                      <EmployeeCard employee={child} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organization Chart</h1>
              <p className="text-gray-600">Company structure and team hierarchy</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Actions */}
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Collapse All
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Org Chart */}
        <div 
          ref={containerRef}
          className="bg-white rounded-lg shadow-sm border p-8"
          style={{ 
            overflowX: 'auto', 
            overflowY: 'visible',
            scrollBehavior: 'auto'
          }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-8 text-center">Organizational Structure</h2>
          <div className="flex justify-center min-w-max pb-8">
            <EmployeeCard employee={orgData} isRoot={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;