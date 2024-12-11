// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRoleManagement {
    enum Role {
        CompanyUser,
        RawMaterialSupplier,
        ElectricitySupplier,
        AdminUser,
        GoodsAndServicesPartner,
        Verifier
    }

    mapping(address => Role) public roles;
    address public superAdmin;

    event RoleAssigned(address indexed user, Role role);
    event AdminAdded(address indexed admin);

    modifier onlyAdmin() {
        require(
            roles[msg.sender] == Role.AdminUser || msg.sender == superAdmin,
            "Not an Admin"
        );
        _;
    }

    constructor() {
        superAdmin = msg.sender;
        roles[superAdmin] = Role.AdminUser;
        emit RoleAssigned(superAdmin, Role.AdminUser);
    }

    function assignRole(address user, Role role) public onlyAdmin {
        roles[user] = role;
        emit RoleAssigned(user, role);
    }

    function addAdmin(address newAdmin) public onlyAdmin {
        roles[newAdmin] = Role.AdminUser;
        emit AdminAdded(newAdmin);
        emit RoleAssigned(newAdmin, Role.AdminUser);
    }

    function removeAdmin(address admin) public onlyAdmin {
        delete roles[admin];
        emit AdminAdded(admin);
        emit RoleAssigned(admin, Role.AdminUser);
    }

    function getRole(address user) public view returns (Role) {
        return roles[user];
    }

    function isVerifier(address user) public view returns (bool) {
        return roles[user] == Role.Verifier;
    }

    function removeVerifier(address verifier) external onlyAdmin {
        delete roles[verifier];
        emit AdminAdded(verifier);
        emit RoleAssigned(verifier, Role.Verifier);
    }
}
